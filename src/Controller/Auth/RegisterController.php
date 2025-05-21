<?php

namespace App\Controller\Auth;

use App\Entity\User;
use App\Form\RegistrationForm;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegisterController extends AbstractController
{
    #[Route('/auth/register', name: 'app_auth_register')]
    public function index(Request $request, UserPasswordHasherInterface $userPasswordHasher, Security $security, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationForm::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var string $plainPassword */
            $plainPassword = $form->get('plainPassword')->getData();

            $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

            $entityManager->persist($user);
            $entityManager->flush();

            if (in_array('ROLE_ADMIN', $user->getRoles(), true)){
                return $this->redirectToRoute('app_categories_index',[], Response::HTTP_SEE_OTHER);
            }
            if (in_array('ROLE_USER', $user->getRoles(), true)){
                return $this->redirectToRoute('app_articles_index',[], Response::HTTP_SEE_OTHER);
            }
            //return $security->login($user, 'form_login', 'main');
        }

        return $this->render('auth/register/index.html.twig', [
            'registrationForm' => $form,
        ]);
    }
}
