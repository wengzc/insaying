/**
 * Created by Administrator on 2017/8/13.
 */
/**
 * Created by Administrator on 2017/8/11.
 */
import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Location } from '@angular/common';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';


import { UserService } from '../../../core/services/index';
import { SITE_HOST_URL } from '../../../shared/config/index';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() commentlist: any;
  @Input() commentsCount: number;
  @Input() articleAuthor: any;
  @Output() onDelete = new EventEmitter<string>();
  @Output() onVote = new EventEmitter<string>();
  @Output() onPublishReply = new EventEmitter();
  @ViewChild('scrollTarget') scrollTarget: ElementRef;
  @ViewChild('textarea') textarea: ElementRef;

  serverUrl: string = SITE_HOST_URL;
  comment: any;
  selectedComment: any;
  replyValue: string;
  errorMsg: string;
  reply: any;

  constructor(
    public userService: UserService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
  }

  vote(comment) {
    this.onVote.emit(comment);
  }
  delete(comment) {
    this.onDelete.emit(comment);
  }

  selectComment(comment, reply) {
    new Observable( observer => {
      this.selectedComment = comment;
      observer.next();
    }).delay(50).subscribe(data => {
      this.showReply(comment, reply);
      this.textarea.nativeElement.focus();
    });
  }

  showReply(comment, reply) {
    if(reply) {
      this.replyValue = `@${reply.author.name}` + ' ';
    } else {
      this.replyValue = `@${comment.author.name}` + ' ';
    }
    this.reply = reply;
    let scrollTarget = this.scrollTarget.nativeElement;
    let getElementTop = (element) => {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    }
    let viewTop = scrollTarget.getBoundingClientRect().top;
    if(viewTop > window.innerHeight) {
      window.scroll(0, getElementTop(scrollTarget) - window.innerHeight/2);
    }
  }

  cancelReply(comment) {
    this.selectedComment = {};
  }

  publishReply(comment) {
    if(!this.userService.isLogin){
      this.errorMsg = '您还未登陆!';
      return ;
    }
    let content: string;
    if(this.reply) {
      if(this.replyValue.indexOf(`@${this.reply.author.name}`) !== -1) {
        content = this.replyValue.replace(`@${this.reply.author.name} `, '');
      } else {
        content = this.replyValue;
      }
      if(!this.commentCheck(content)) {
        return ;
      }
        this.onPublishReply.emit({
        root_comment: comment._id,
        reply_comment: this.reply._id,
        receiver: this.reply.author._id,
        content: content
      });
    } else {
      if(this.replyValue.indexOf(`@${comment.author.name}`) !== -1) {
        content = this.replyValue.replace(`@${comment.author.name} `, '')
      } else {
        content = this.replyValue;
      }
      if(!this.commentCheck(content)) {
        return ;
      }
      this.onPublishReply.emit({
        root_comment: comment._id,
        reply_comment: comment._id,
        receiver: comment.author._id,
        content: content
      });
    }
    this.replyValue = '';
  }

  commentCheck(content) {
    if(!content) {
      this.errorMsg = '回复不能为空!';
      return false;
    }
    if(content.length < 5) {
      this.errorMsg = '回复不能少于5个字!';
      return false;
    }
    return true;
  }

  valueChange(){
    this.errorMsg = '';
  }
}
