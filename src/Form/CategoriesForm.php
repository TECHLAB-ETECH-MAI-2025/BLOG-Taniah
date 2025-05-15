<?php

namespace App\Form;

use App\Entity\Categories;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class CategoriesForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('titre', TextType::class,[
                'label'=> 'Titre',
                'attr' => [
						'class' => 'form-control',
						'placeholder' => 'Entrez un titre pour votre catégorie',
						'required' => true
					]
            ])
            ->add('description',TextareaType::class, [
                'label' => 'Contenu de l\'article',
                'attr' => [
                    'class' => 'form-control',
                    'rows' => 10,
                    'placeholder' => 'La déscription de catégorie ...',
                    'required' => true
                ]
            ])
            ->add('createdAt')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Categories::class,
        ]);
    }
}
