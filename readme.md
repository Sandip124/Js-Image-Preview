## Image preview

The Image preview feature was awesome but it was not looking nice as if some css is missing so this could be the solution.
we just need to consider these in order to make our form nicer and also added clear button for the image preview. to clear the image.

[View Demo](https://js-image-preview.now.sh/)

Implemented reset icon form the cssicon project by Wenting Zhang.
[CSS ICONS by Wenting Zhang](https://cssicon.space/)

Your Html Form
-

### HTML
```html
<div class="image-preview inline-image-preview"></div>
<input name="file" type="file" id="file" class="form-control" data-display=".image-preview" />
```
### JS
```js
      const file = document.getElementById("file");
      const btn_options = {
        show: true,
        title : "Reset Image",
        clicked: () => {
          console.log("Reset button clicked.")
        },
        styles : {
          position: 'absolute',
          right: '10px',
          top:'10px',
          background: '#03A9F4',
          border: 'none',
          color: '#fff' ,
          padding: '5px',
          width:'30px',
          height:'30px',
          "box-shadow": '1px 1px 10px #646464'
        }
      };

      //initialize image previewer
      ImagePreviewer({
        btn_options
      }).Init(file);
```
