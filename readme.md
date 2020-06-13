## Image preview

The Image preview feature was awesome but it was not looking nice as if some css is missing so this could be the solution.
we just need to consider these in order to make our form nicer and also added clear button for the image preview. to clear the image.

[View Demo](https://js-image-preview.now.sh/)

Implemented reset icon form the cssicon project by Wenting Zhang.
[CSS ICONS by Wenting Zhang](https://cssicon.space/)

Create Form
-

### HTML
```html
<div id="image" class="inline-image-preview"></div>
<input name="file" type="file" id="file" class="form-control"/>
```
### JS
```js
const file = document.getElementById('file');  
const imageElm = document.getElementById('image');  
file.addEventListener("change",function()  
{  
    InitImagePreview(this,imageElm);  
});
```

Update Form
-

### HTML
```html
<div id="image" class="inline-image-preview" data-image="{your-image-url}"></div>
<input name="file" type="file" id="file" class="form-control"/>
```

### JS

```js
const file = document.getElementById('file');  
const imageElm = document.getElementById('image');  
InitPreviewImage(imageElm);  
file.addEventListener("change",function()  
{  
    InitImagePreview(this,imageElm);  
});
```

### Behind the scene

```js
function InitImagePreview(input,imageElm) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            if(isBase64(imageUrl.split(',')[1])) {
                imageElm.style.backgroundImage = 'url(' + imageUrl + ')';
                imageElm.style.border = '1px solid #ddd';
            }
            if (!imageElm.hasChildNodes()) {
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
            }
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
    const imageUrlParts = imageUrl.split('/');
    const lastUrlParts = imageUrlParts[imageUrlParts.length-1];
    if(lastUrlParts !== '' &&  lastUrlParts.split('.').length == 2)
    {
        elm.style.backgroundImage = 'url(' + imageUrl + ')';
        elm.style.border = '1px solid #ddd';
    }
}

function isBase64(str) {
    if (str ===''){ return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}
```


```css
.inline-image-preview{
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/images/empty-image.jpg'),linear-gradient(#8ec0ff, #3f8bc6);
  width: 100%;
  height: 300px;
  background-position: center;
}
```