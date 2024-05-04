"""
Created on Sat May  4 13:07:18 2024

@author: YASMINE96
"""

import argparse
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
import numpy as np

# Fonction pour charger et effectuer la prédiction sur une image
def predict_image(model, image_path, threshold=0.5):
    # Charger une image à tester
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    # Effectuer la prédiction
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)
    prediction_probability = prediction[0][predicted_class]

    # Vérifier si la probabilité de détection dépasse le seuil
    if prediction_probability >= threshold:
        # Récupérer le nom de la classe prédite
        class_names = ['Black Sea Sprat', 'Gilt-Head Bream', 'Horse Mackerel', 'Red Mullet', 'Red Sea Bream', 'Sea Bass', 'Shrimp', 'Striped Red Mullet', 'Trout']
        predicted_class_name = class_names[predicted_class]

        # Retourner la classe prédite et la probabilité de prédiction
        return predicted_class_name, prediction_probability
    else:
        return "Indéterminé", prediction_probability

if __name__ == "__main__":
    # Créer un analyseur d'arguments
    parser = argparse.ArgumentParser(description='Faire une prédiction sur une image avec un modèle pré-entraîné')

    # Ajouter un argument pour le chemin de l'image
    parser.add_argument('image_path', type=str, help='Chemin de l\'image à prédire')

    # Analyser les arguments de la ligne de commande
    args = parser.parse_args()

    # Charger le modèle que nous avons entrainé
    model = tf.keras.models.load_model('C:/Users/YASMINE96/Documents/Project_IA/1rst-model-yas.h5')

    # Spécifier le seuil de probabilité
    seuil = 0.8  

    # Effectuer la prédiction sur l'image spécifiée avec le seuil spécifié
    predicted_class, prediction_probability = predict_image(model, args.image_path, threshold=seuil)

    # Afficher le résultat de la prédiction
    print(f'Classe prédite : {predicted_class}')
    print(f'Probabilité de prédiction : {prediction_probability:.3f}')

