<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Articles;
use App\Form\ArticlesForm;
use App\Repository\ArticlesRepository;

final class ApiArticleController extends AbstractController
{
    #[Route('/api/articles', name: 'api_article')]
    public function index(Request $request, ArticlesRepository $repo): JsonResponse
    {
        // $draw= $request->query->getInt('draw');
        // $start= $request->query->getInt('start', 0);
        // $length= $request->query->getInt('length', 1);
        // $searchValue= $request->query->get('search')['value'] ?? '';

        // $querybuilder= $repo->createQueryBuilder('article');

        // if (!empty($searchValue)){
        //     $querybuilder->where('article.title LIKE :search OR article.content LIKE :search')
        //                 ->setParameter('search', '%' . $searchValue .'%');

        // }
        
        // $totalFiltered = count($querybuilder->getQuery()->getResult());

        // $querybuilder->setFirstResult($start)
        // ->setMaxResults($length);

        $articles= $repo->findAll();
        // $articles = $querybuilder->getQuery()->getResult();
        // $totalRecords = $repo->count([]);
        
        $data= [];
        foreach($articles as $article){
            $url_show = $this->generateUrl('app_articles_show',['id'=> $article->getId()]);
            $url_edit = $this->generateUrl('app_articles_edit',['id'=> $article->getId()]);
            $data[] = [
                'titre' => $article->getTitle(),
                'contenu' => $article->getContent(),
                'date' => $article->getCreatedAt(),
                'actions' => '<div class="d-flex flex-row justify-content-center align-items-center gap-2">'
                        . '<a href="' .$url_show . '" class="btn btn-primary">Voir</a>'
                        . '<a href="' .$url_edit . '" class="btn btn-success">Modifier</a>'
                    . '</div>'
            ];
        }

        return $this->json([
            // 'draw' => $draw,
            // 'recordsTotal' => $totalRecords,
            // 'recordsFiltered' => $totalFiltered, 
            'data' => $data,
        ]);
    }
}
