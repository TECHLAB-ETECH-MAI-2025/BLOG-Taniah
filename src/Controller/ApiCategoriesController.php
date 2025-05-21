<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Categories;
use App\Form\CategoriesForm;
use App\Repository\CategoriesRepository;

final class ApiCategoriesController extends AbstractController
{
    #[Route('/api/categories', name: 'api_categories')]
    public function index(Request $request, CategoriesRepository $repo): JsonResponse
    {
        $categories= $repo->findAll();
       
        $data= [];
        foreach($categories as $categorie){
            $url_show = $this->generateUrl('app_categories_show',['id'=> $categorie->getId()]);
            $url_edit = $this->generateUrl('app_categories_edit',['id'=> $categorie->getId()]);
            
            $data[] = [
                'titre' => $categorie->getTitre(),
                'description' => $categorie->getDescription(),
                'date' => $categorie->getCreatedAt(),
                'actions' => '<div class="d-flex flex-row justify-content-end align-items-center gap-2">'
                        . '<a href="' .$url_show . '" class="btn btn-primary">Voir</a>'
                        . '<a href="' .$url_edit . '" class="btn btn-success">Modifier</a>'
                    . '</div>'
            ];
        }

        return $this->json(['data' => $data,]);
    }
}
