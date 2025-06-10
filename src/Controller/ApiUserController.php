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

final class ApiUserController extends AbstractController
{
    #[Route('/api/user', name: 'api_user')]
    public function index(Request $request): JsonResponse
    {
        $user = $this->getUser();
        return $this->json([
            'success' => true,
            'data' => $user,
        ]);
    }
}
