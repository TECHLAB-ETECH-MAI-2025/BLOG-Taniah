<?php

namespace App\Form;

use App\Entity\Articles;
use App\Entity\Categories;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ArticlesForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class,[
                'label'=> 'Titre',
                'row_attr' => [
                    'class' => 'form-group mb-4',
                ],
                'attr' => [
                    'class' => 'form-control',
                    'placeholder' => 'Entrez un titre pour votre article',
                    'required' => true
                ]
            ])
            ->add('content',TextareaType::class, [
                'label' => 'Contenu de l\'article',
                'row_attr' => [
                    'class' => 'form-group mb-4',
                ],
                'attr' => [
                    'class' => 'form-control',
                    'rows' => 10,
                    'placeholder' => 'Le contenu de votre article ...',
                    'required' => true
                ]
            ])
            ->add('created_at',DateTimeType::class, [
                'label' => 'Date de création',
                'row_attr' => [
                    'class' => 'form-group mb-4',
                ],
                'attr' => [
                    'class' => 'form-control',
                    'placeholder' => 'Date de création article ...',
                    'required' => true
                ]
            ])
            ->add('categories', EntityType::class, [
                'label' => 'Catégories',
                'row_attr' => [
                    'class' => 'form-group mb-4',
                ],
                'attr' => [
                    'class' => 'form-control',
                ],
                'class' => Categories::class,
                'choice_label' => 'titre',
                'multiple' => true,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Articles::class,
        ]);
    }
}
