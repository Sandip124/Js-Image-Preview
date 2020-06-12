function InitImagePreview(input,imageElm) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            setImageAttribute(imageElm,e.target.result)
            const btn = document.createElement('button');
            btn.innerHTML ="<i class='fa fa-refresh'></i>";
            btn.style.position = 'absolute';
            btn.style.right= '20px';
            btn.style.top ='30px';
            btn.style.background = '#03A9F4';
            btn.style.border= 'none';
            btn.style.color= '#fff' ;
            btn.title = "Reset";
            btn.style.padding = '5px';
            btn.style.borderRadius = '5px';
            btn.style.width= '30px';
            btn.style.boxShadow = '1px 1px 10px #646464';
            btn.addEventListener('click',function(evt){
                evt.preventDefault();
                input.value = '';
                imageElm.style.background = '';
                imageElm.removeChild(btn);
                InitPreviewImage(imageElm);
            })
            imageElm.appendChild(btn);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function InitPreviewImage(elm)
{
    if(elm.hasAttribute('data-image'))
    {
        const imageUrl = elm.getAttribute('data-image');
        setImageAttribute(elm,imageUrl)
    }
}

function setImageAttribute(elm,imageUrl)
{
    elm.style.backgroundImage = 'url('+imageUrl+')';
    elm.style.border = '1px solid #ddd';
}