const ImagePreviewer = ({ disp_attr = "display", before_change = null, changed = null, btn_options = {}} = {}) => {
    const btn_cls = declare_style(btn_options.styles || {});
    return {
        Init : (elm) => {
            const disp_elm_selector = elm.dataset[disp_attr];
            const disp_elms = document.querySelectorAll(disp_elm_selector);
            elm.addEventListener('change', e => {
                disp_elms && disp_elms.forEach(x => {
                    const event_data = {
                        file: elm,
                        display: x
                    };
                    before_change && before_change(e, event_data);
                    InitImagePreview(elm, x, {
                        ...btn_options,
                        btn_cls,
                        disp_btn : btn_options.show === undefined ? true : btn_options.show,
                        title : btn_options.title === undefined ? "Reset" : btn_options.title,
                        
                    });
                    changed && changed(e, event_data);
                });
            });
        }
    };
};

function declare_style(style_options) {
    let styles = "";
    for(let rule in style_options) {
        styles += `${rule}: ${style_options[rule]};`;
    }
    const cls = "img_preview_" + [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
    const x = `
        .${cls} {
            ${styles}            
        }
    `;
    const style_elm = document.createElement('style');
    style_elm.innerHTML = x;
    document.body.appendChild(style_elm);
    return cls;
}

function InitImagePreview(input,imageElm, {
    btn_cls, disp_btn = true, title, ...btn_options
}) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
           
            const imageUrl = e.target.result;
            if(isBase64(imageUrl.split(',')[1])) {
                imageElm.style.backgroundImage = 'url(' + imageUrl + ')';
                imageElm.style.border = '1px solid #ddd';
            }
            if (!imageElm.hasChildNodes()) {
                if(disp_btn) {
                    const btn = document.createElement('button');
                    btn.innerHTML ="<i class='fa fa-refresh'></i>";
                    btn.title = title;
                    btn.classList.add(btn_cls);
                    btn.addEventListener('click',function(evt){
                        evt.preventDefault();
                        input.value = '';
                        imageElm.style.background = '';
                        imageElm.removeChild(btn);
                        InitPreviewImage(imageElm);
                        if(btn_options.clicked !== undefined) {
                            btn_options.clicked(evt, {
                                img: input
                            });
                        }
                    })
                    imageElm.appendChild(btn);
                }
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