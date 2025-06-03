<?php
namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use App\Form\MessageForm;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use  Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

#[Route('/chat')]
class ChatController extends AbstractController
{
    #[Route('/{receiverId}', name: 'chat_index')]
    public function index(
            int $receiverId,MessageRepository $messageRepository,
        EntityManagerInterface $entityManager,Request $request,HubInterface $hub): Response 
    {
        /** @var User $currentUser */
        $currentUser = $this->getUser();
        if (!$currentUser instanceof UserInterface) {
            throw $this->createAccessDeniedException('Vous devez être connecté.');
        }

        $receiver = $entityManager->getRepository(User::class)->find($receiverId);
        if (!$receiver) {
            throw $this->createNotFoundException('Utilisateur non trouvé.');
        }

        $messages = $messageRepository->findConversation($currentUser->getId(), $receiverId);

        $message = new Message();

        $form = $this->createForm(MessageForm::class, $message);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $message->setSender($currentUser);
            $message->setReceiver($receiver);
            $message->setCreatedAt(new \DateTimeImmutable());
            $entityManager->persist($message);
            $entityManager->flush();

            $topic="/chat/{$receiverId}";
            var_dump($topic);

            $data=[
                'sender'=>$currentUser->getPseudo(),
                'message'=>$message->getContent(),
                'timestamp'=>$message->getCreatedAt()->format('H:i'),
            ];
            $update=new Update($topic,json_encode($data));
            $hub->publish($update);

            return $this->redirectToRoute('chat_index', ['receiverId' => $receiverId]);
        }

        return $this->render('chat/index.html.twig', [
            'messages' => $messages,
            'success' => true,
            'receiver' => $receiver,
            'pseudo' => $currentUser,
            'form' => $form->createView(),
        ]);
    }
}