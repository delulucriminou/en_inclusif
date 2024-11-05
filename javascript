$(document).ready(function() {
    
    const replaceButton = $('#replaceButton');
    const textarea = $('#text_editor_textarea');
//en cas d'erreur
    if (replaceButton.length === 0 || textarea.length === 0) {
        console.error("Le bouton ou la zone de texte n'ont pas été trouvés.");
        return;
    }

  
    replaceButton.on('click', function() {
        
        let text = textarea.val();

       
        alert("Texte original: " + text);

      
        const containsHTML = /<[^>]+>/.test(text);


        const urlRegex = /https?:\/\/[^\s]+|www\.[^\s]+/g;
        const urls = text.match(urlRegex) || [];
        
      
        let newText = text.replace(urlRegex, (url) => {
            return `__URL_${urls.indexOf(url)}__`; 
        });

   
        newText = newText.replace(/\.([a-zA-ZÀ-ÿ])/g, '·$1'); 

     
        urls.forEach((url, index) => {
            newText = newText.replace(`__URL_${index}__`, url);
        });

       
        alert("Texte transformé: " + newText);

        // Message du presse papier, possibilité de le personnaliser
        if (confirm("Souhaitez-vous copier le texte transformé dans le presse-papiers ?")) {
            navigator.clipboard.writeText(newText).then(function() {
                alert("Texte copié dans le presse-papiers !");
            }, function(err) {
                alert("Erreur lors de la copie du texte : ", err);
            });
        }

       
        textarea.val(newText);
    });
});
