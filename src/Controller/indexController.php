<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\SecurityBundle\Security;

final class indexController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(Security $security): Response
    {
        if ($security->isGranted('ROLE_USER')) {
            return $this->redirectToRoute('app_articles_index', [], Response::HTTP_SEE_OTHER);
        }
        return $this->redirectToRoute('app_auth_login', [], Response::HTTP_SEE_OTHER);
    }
}
