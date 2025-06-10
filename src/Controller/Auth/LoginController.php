<?php

namespace App\Controller\Auth;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

final class LoginController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $passwordHasher,
        private TokenStorageInterface $tokenStorage,
        private CsrfTokenManagerInterface $csrfTokenManager
    ) {}

    #[Route('/auth/csrf-token', name: 'csrf_token', methods: ['GET'])]
    public function getCsrfToken(): JsonResponse
    {
        $token = $this->csrfTokenManager->getToken('authenticate');
        return new JsonResponse(['csrf_token' => $token->getValue()]);
    }

    #[Route('/auth/login', name: 'app_auth_login')]
    public function index(AuthenticationUtils $authenticationUtils): Response
    {
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('auth/login/index.html.twig', [
            'last_username' => $lastUsername,
            'error'         => $error,
        ]);
    }

    // #[Route('/auth/login', name: 'app_auth_login', methods: ['POST'])]
    // public function index(Request $request): JsonResponse
    // {
    //     $content = $request->getContent();
    //     $data = json_decode($content, true);

    //     if (!$data || !isset($data['email']) || !isset($data['password'])) {
    //         return new JsonResponse([
    //             'success' => false,
    //             'message' => 'Données manquantes ou invalides'
    //         ], 400);
    //     }

    //     $email = trim($data['email']);
    //     $password = trim($data['password']);

    //     $user = $this->userRepository->findOneBy(['email' => $email]);

    //     if (!$user) {
    //         return new JsonResponse([
    //             'success' => false,
    //             'message' => 'Identifiant inconnu'
    //         ], 401);
    //     }

    //     if (!$this->passwordHasher->isPasswordValid($user, $password)) {
    //         return new JsonResponse([
    //             'success' => false,
    //             'message' => 'Mot de passe incorrect'
    //         ], 401);
    //     }

    //     return new JsonResponse([
    //         'success' => true,
    //         'message' => 'Connexion réussie',
    //         'user' => [
    //             'id' => $user->getId(),
    //             'email' => $user->getEmail(),
    //             'roles' => $user->getRoles()
    //         ]
    //     ]);
    // }

        // #[Route('/auth/login', name: 'app_auth_login_get', methods: ['GET'])]
        // public function loginGet(): JsonResponse
        // {
        //     return new JsonResponse([
        //         'success' => false,
        //         'message' => 'Veuillez utiliser POST pour vous connecter.'
        //     ], 405);
        // }
        
    #[Route('/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('Intercepté par le pare-feu.');
    }
}