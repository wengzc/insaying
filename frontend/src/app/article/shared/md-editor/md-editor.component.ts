/**
 * Created by Administrator on 2017/8/9.
 */
import { Component, EventEmitter, ElementRef, OnInit, ViewChild, Output, Input } from '@angular/core'
import { MdEditorService } from './md-editor.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import * as SimpleMDE from 'simplemde';

@Component({
  selector: 'smd-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.css'],
  providers: [ MdEditorService ]
})
export class MdEditorComponent implements OnInit {
  @Output() smdChange = new EventEmitter<any>()
  @ViewChild('simplemde') textarea: ElementRef;

  initialValue: string = '';
  private smd;
  article_id: string;
  article: any;

  constructor(
    private el: ElementRef,
    private mdEditorService :MdEditorService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(){
    this.article_id = this._activatedRoute.snapshot.params['id'];
    if(this.article_id) {
    this.mdEditorService.getArticleContent(this.article_id).subscribe( article => {
      let body = article.json();
      this.article = body.article;
      this.initialValue = this.article.content;
      let config = {
        element: this.textarea.nativeElement,
        placeholder: "请输入正文...",
        initialValue: this.initialValue,
        showIcons: ["code", "heading-smaller", "heading-bigger"],
        hideIcons: ["side-by-side", "fullscreen"],
        spellChecker: false,
        autoDownloadFontAwesome:false
      };
      config = Object.assign({}, config);
      this.smd = new SimpleMDE(config);
      this.smd.codemirror.on("change", () => this.smdChange.emit(this.smd.value()));
    })
    } else {
      let config = {
        element: this.textarea.nativeElement,
        placeholder: "请输入正文...",
        initialValue: this.initialValue,
        showIcons: ["code", "heading-smaller", "heading-bigger"],
        hideIcons: ["side-by-side", "fullscreen"],
        spellChecker: false,
        autoDownloadFontAwesome:false
      };
      config = Object.assign({}, config);
      this.smd = new SimpleMDE(config);
      this.smd.codemirror.on("change", () => this.smdChange.emit(this.smd.value()));
    }
  }

}
