/// <reference path="../../node_modules/@types/mithril/index.d.ts" />
import * as m from 'mithril';

/// <reference path="../../node_modules/@types/marked/index.d.ts" />
import * as marked from 'marked';

import '../../node_modules/bulma/css/bulma.css';
import '../scss/test.scss';
import '../scss/rme.css';

//GennaiEditor仕様
//edit側の記述はdiv要素に分割されて入る

class tGennaiEditor{
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

class GennaiEditor{
    constructor(target:Element){
        //window['MathJax'].Hub.Queue(["Typeset",window['MathJax'].Hub,target]);
        m.mount(target,new GEBase());
    }
}

class ComponentBasic implements Mithril.Component<{},{}> {
    public oninit:(vnode:Mithril.VnodeDOM<{},{}>)=>void;
    public oncreate:(vnode:Mithril.VnodeDOM<{},{}>)=>void;
    public onbeforeupdate:(vnode:Mithril.VnodeDOM<{},{}>,old)=>boolean;
    public onupdate:(vnode:Mithril.VnodeDOM<{},{}>)=>void;
    public onbeforeremove:(vnode:Mithril.VnodeDOM<{},{}>)=>void;
    public onremove:(vnode:Mithril.VnodeDOM<{},{}>)=>void;

    public view:()=> Mithril.Vnode<{},{}>

    constructor(){
        
    }
}

class GEBase extends ComponentBasic{
    constructor(){
        super();
        this.oncreate = (vnode)=>{
            console.log(vnode.dom);
        }

        this.view = ()=>{
            return m('div',[
                m('div.rme-nav_area',{},[
                    m('div.rme-nav_col',{},[
                        m('p.control.has-addons',{},[
                            m('input.input',{type:"text",placeholder:'Article Title'},''),
                            m('a.button.is-info.postbutton',{},'投稿')
                        ])
                    ]),
                    m(new GEEditMenu())
                ]),
                m('div.rme-editor_content',{},[
                    m('pre.rme-editor_edit',m(new GEEditArea())),
                    m(new GERenderArea())
                ])
            ]);
        }
    }
}

//入力領域のコンポーネント
class GEEditArea extends ComponentBasic{
    constructor(){
        super();
        this.view = ()=>{
            return m('div.rme-editor_edit_inner',{contenteditable:true},m.trust(''));
        }
    }
}

//描画領域のコンポーネント
class GERenderArea extends ComponentBasic{
    constructor(){
        super();
        this.view = ()=>{
            return m('div.rme-editor_render.content',{},'When $$$a \\ne 0$$$, there are two solutions to $$$ax^2 + bx + c = 0$$$ and they are$$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$$');
        }
    }
}

class GEEditMenu extends ComponentBasic{
    constructor(){
        super();
        this.view = ()=>{
            return m('div.rme-nav_col.rme-editmenu',{},'Edit menu is here.');
        }
    }
}

//第一引数:ターゲットのdom 第二引数:初期値の配列
//let hello = new tGennaiEditor(document.querySelector('.rme-editor_content'),["aa","bb"]);
window.onload = function(){
    let gennaiEditor = new GennaiEditor(document.querySelector('body'));
}