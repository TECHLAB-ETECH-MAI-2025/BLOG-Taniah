<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse; // Import manquant
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Articles;
use App\Entity\ArticleLike;
use App\Repository\ArticleLikeRepository;

final class ArticleLikeController extends AbstractController
{
    #[Route('/articles/{id}/like', name: 'app_article_like', methods: ['POST'])]
    public function like(Request $request, Articles $article, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $username = $request->getSession()->get('username');

            if (!$username) {
                return new JsonResponse([
                    'error' => 'Utilisateur non connecté'
                ], 401);
            }

            $repo = $entityManager->getRepository(ArticleLike::class);
            $existing = $repo->findOneBy([
                'article' => $article,
                'utilisateur' => $username,
            ]);

            if (!$existing) {
                $like = new ArticleLike();
                    $like->setArticle($article);
                    $like->setUtilisateur($username);
                    $like->setCreatAt(new \DateTimeImmutable());

                $entityManager->persist($like);
                $entityManager->flush();

                $liked = true;
            } else {
                $entityManager->remove($existing);
                $entityManager->flush();

                $liked = false;
            }

            $likesCount = $entityManager->getRepository(ArticleLike::class)->count(['article' => $article]);

            return new JsonResponse([
                'likesCount' => $likesCount,
                'liked' => $liked,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
}