<?php

namespace App\state;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserPasswordHasher implements ProcessorInterface{
    public function __construct(
        private ProcessorInterface $processor,
        private UserPasswordHasherInterface $passwordHasher
    ){}

    public function process(mixed $data, Operation $operation, array $uriVariables=[], array $context=[]):mixed{
        if(!$data instanceof User || !$data->getPlainPassword()){
            return $this->processor->process($data,$operation,$uriVariables,$context);
        }

        $hashed = $this->passwordHasher->hashPassword(
            $data,
            $data->getPlainPassword()
        );
        $data->setPassword($hashed);
        $data->eraseCredentials();

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
    
    
}