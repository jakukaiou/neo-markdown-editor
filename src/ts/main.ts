/// <reference path="../../node_modules/@types/marked/index.d.ts" />
import * as marked from 'marked';

import '../../node_modules/bulma/css/bulma.css';
import '../scss/test.scss';
import '../scss/rme.css';

//GennaiEditor仕様
//edit側の記述はdiv要素に分割されて入る
class GennaiEditor{

    constructor(target:Element,source:any){
        window['MathJax'].Hub.Queue(['Typeset',window['MathJax'].Hub,target]);
        let GEeditorString:string = 
        '<div class="rme-nav_area">' +
            '<div class="rme-nav_col">' +
                '<p class="control has-addons">' +
                    '<input class="input" type="text" placeholder="タイトルを入力">' +
                    '<a class="button is-info postbutton">' +
                        '投稿' +
                    '</a>' +
                '</p>' +
            '</div>' +
            '<div class="rme-nav_col rme-editmenu">' +
                'ここにエディットメニュー' +
            '</div>' +
        '</div>' +

        '<div class="rme-editor_content">' +
            '<pre class="rme-editor_edit">' +
                '<div class="rme-editor_edit_inner" contenteditable="true"></div>' +
            '</pre>' +
            '<div class="rme-editor_render content">' +
                'When $$$a \\ne 0$$$, there are two solutions to $$$ax^2 + bx + c = 0$$$ and they are $$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$$'
            '</div>'
        '</div>';

        target.innerHTML = GEeditorString;

        let editArea = document.querySelector('.rme-editor_edit_inner');
        let rennderArea = document.querySelector('.rme-editor_render');

        let render = new SourceRender(editArea,rennderArea,null);
    }
}

class SourceRender{
    private editArea:Element;
    private renderArea:Element;

    constructor(editElement:Element,renderElement:Element,source:any){
        //sourceにはeditの初期値が入る
        this.editArea = editElement;
        this.renderArea = renderElement;
        this.editArea.innerHTML = '';

        if(source === null){
            let firstEditor = new Editor();

            this.editArea.appendChild(firstEditor.editNode);
        }
    }
    
}

class Editor{
    public editNode: Element;

    constructor(){
        this.editNode = document.createElement('div');
        this.editNode.innerHTML = 'extends node';
    }
}

//第一引数:ターゲットのdom 第二引数:初期値の配列
//let hello = new tGennaiEditor(document.querySelector('.rme-editor_content'),["aa","bb"]);
window.onload = function(){
    let gennaiEditor = new GennaiEditor(document.querySelector('body'),null);
}










//ここ以降は以前のコード

class mukashiGennaiEditor{
    private editArea:Element;
    private editAreaInner:Element;
    private editTargetElement:Element;

    constructor(targetElement:Element,contents:Array<String>){
        //console.log(marked('*aaa*'));
        this.editTargetElement = document.createElement('div');
        console.log(this.editTargetElement);
        this.editArea = document.querySelector('rme_editor_edit');
        this.editAreaInner = document.querySelector('.rme-editor_edit_inner');

        this.editAreaInner.addEventListener('keypress',this.render.bind(this));
    }

    private render(e:KeyboardEvent){
        if(!this.editAreaInner.innerHTML || this.editAreaInner.innerHTML === '<br>'){
            //初期化処理
            console.log("init");
            document.execCommand('insertHTML', false, '<div>'+e.key+'</div>');
        }else{
            console.log(e);
        }
        console.log(this.editAreaInner.childNodes);
        /*
        console.log(e.key);
        if(e.key == 'Enter'){
            document.execCommand('insertHTML', false, '<br><div></div>');
            e.preventDefault();
        }
        console.log(this);
        //console.log(this.editAreaInner);
        */
    }
}