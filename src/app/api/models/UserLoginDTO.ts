/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Modèle de données pour la connexion utilisateur
 */
export type UserLoginDTO = {
    /**
     * Adresse email de l'utilisateur (format email valide requis)
     */
    email: string;
    /**
     * Mot de passe (minimum 8 caractères avec majuscules, minuscules, chiffres)
     */
    password: string;
};

