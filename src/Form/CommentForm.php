<?php

namespace App\Form;

use App\Entity\Articles;
use App\Entity\Comment;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CommentForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('author', TextType::class,[
                'label'=> 'Auteur',
                'attr' => [
						'class' => 'form-control',
						'placeholder' => 'L \' auteur',
						'required' => true
					]
            ])
            ->add('content',TextareaType::class, [
                'label' => 'Contenu de l\'article',
                'attr' => [
                    'class' => 'form-control',
                    'rows' => 10,
                    'placeholder' => 'Le contenu de votre article ...',
                    'required' => true
                ]
            ])
            ->add('createdAt')
            // ->add('article', EntityType::class, [
            //     'class' => Articles::class,
            //     'choice_label' => 'title',
            // ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Comment::class,
        ]);
    }
}
