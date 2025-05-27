<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class ApiPostGetController extends AbstractController
{
    #[Route('/api/post/get', name: 'app_api_post_get')]
    public function affiche(HttpClientInterface $client): Response
    {
        $url = 'https://jsonplaceholder.typicode.com/posts';

        $response = $client->request('GET', $url);

        $data = $response->toArray();

        return $this->render('api_post_get/index.html.twig', [
            'donnees' => $data,
        ]);
    }

    #[Route('api/post/get/conversion', name: 'app_api_conversion', methods: ['GET'])]
    public function conversion():Response
    {

    }
}
