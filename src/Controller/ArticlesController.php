<?php

namespace App\Controller;

use App\Entity\Articles;
use App\Form\ArticlesForm;
use App\Repository\ArticlesRepository;

use App\Entity\Comment;
use App\Form\CommentForm;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/articles')]
final class ArticlesController extends AbstractController
{
    #[Route(name: 'app_articles_index', methods: ['GET'])]
    public function index(ArticlesRepository $articlesRepository, Request $request, PaginatorInterface $paginator): Response
    {
        // $query = $articlesRepository
        //     ->createQueryBuilder('a')
        //     ->getQuery();

        // $pagination = $paginator->paginate(
        //     $query,
        //     $request->query->getInt('page', 1),
        //     1
        // );

        return $this->render('articles/index.html.twig'
        // ,[
        //     'success'=>true,
        //     // 'data'=>$pagination,
        // ]
        );
    }

    #[Route('/new', name: 'app_articles_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $article = new Articles();
        $form = $this->createForm(ArticlesForm::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($article);
            $entityManager->flush();

            return $this->redirectToRoute('app_articles_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('articles/new.html.twig', [
            'article' => $article,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_articles_show', methods: ['GET', 'POST'])]
    public function show(Articles $article, Request $request,  EntityManagerInterface $entityManager): Response
    {
        // Création d'un nouveau commentaire
		$comment = new Comment();
		$comment->setArticle($article);

        // Création du formulaire
		$form = $this->createForm(CommentForm::class, $comment);
		$form->handleRequest($request);

        // Traitement du formulaire
		if ($form->isSubmitted() && $form->isValid()) {
			$comment->setCreatedAt(new \DateTime());

			// Enregistrement du commentaire
			$entityManager->persist($comment);
			$entityManager->flush();
			// Message de succès
			$this->addFlash('success', 'Votre commentaire a été publié avec succès !');

            // Redirection pour éviter le rechargement du formulaire
			return $this->redirectToRoute(
				'app_articles_show',
				['id' => $article->getId()],
				Response::HTTP_SEE_OTHER
			);
		}
        return $this->render('articles/show.html.twig', [
            'article' => $article,
            'commentForm' => $form->createView(),
        ]);
    }

    #[Route('/{id}/edit', name: 'app_articles_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Articles $article, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ArticlesForm::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_articles_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('articles/edit.html.twig', [
            'article' => $article,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_articles_delete', methods: ['POST'])]
    public function delete(Request $request, Articles $article, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$article->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($article);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_articles_index', [], Response::HTTP_SEE_OTHER);
    }
}
