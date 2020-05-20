import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSubscription: Subscription
  dSubscription: Subscription
  searchStr = ''
  constructor(
    private postService: PostService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.pSubscription = this.postService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string) {
    this.dSubscription = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Пост удален')
    })
  }
  ngOnDestroy(): void {
    if (this.pSubscription) {
      this.pSubscription.unsubscribe()
    }
    if (this.dSubscription) {
      this.dSubscription.unsubscribe()
    }
  }
}
