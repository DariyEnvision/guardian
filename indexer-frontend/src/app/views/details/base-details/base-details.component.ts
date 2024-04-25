import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetailsResults, IRelationshipsResults } from '@services/search.service';
import { Subscription } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'base-details',
    template: '',
    styles: []
})
export abstract class BaseDetailsComponent {
    public loading: boolean = true;
    public id: string = '';

    public uuid: string = '';
    public history: any[] = [];
    public first: any = null;
    public last: any = null;
    public target: any = null;
    public row: any = null;
    public relationships: IRelationshipsResults | null = null;
    public tab: string = '';
    public tabIndex: number = 0;

    private _queryObserver?: Subscription;
    private _paramsObserver?: Subscription;

    constructor(
        protected route: ActivatedRoute,
        protected router: Router
    ) {
    }

    ngOnInit() {
        this.loading = false;
        this._queryObserver = this.route.queryParams.subscribe(params => {
            const tab = params['tab'];
            if (this.id) {
                if (this.tab !== tab) {
                    this.tab = tab;
                    this.tabIndex = this.getTabIndex(tab);
                    this.onNavigate();
                }
            } else {
                this.tab = tab;
                this.tabIndex = this.getTabIndex(tab);
            }
        });
        this._paramsObserver = this.route.params.subscribe(params => {
            const id = params['id'];
            if (this.id !== id) {
                this.id = id;
                this.loadData();
                this.onNavigate();
            }
        });
    }

    ngOnDestroy(): void {
        this._queryObserver?.unsubscribe();
        this._paramsObserver?.unsubscribe();
    }

    protected setResult(result?: IDetailsResults): void {
        this.uuid = '';
        this.history = [];
        this.first = null;
        this.last = null;
        this.target = null;
        this.row = null;
        this.relationships = null;
        if (result) {
            this.row = result.row;
            this.target = result.item;
            if (Array.isArray(result.history)) {
                this.history = result.history;
                this.first = this.history[0] || this.target;
                this.last = this.history[this.history.length] || this.target;
            } else {
                this.first = this.target;
                this.last = this.target;
                this.history = [this.target]
            }
        }
        this.tabIndex = this.getTabIndex(this.tab);
    }

    protected setRelationships(result: IRelationshipsResults): void {
        this.relationships = result;
    }

    protected setTab(tab: string): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { tab },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    protected onTab(event: MatTabChangeEvent) {
        this.setTab(this.getTabName(event.index));
    }

    protected abstract onNavigate(): void;

    protected abstract loadData(): void;

    protected abstract getTabIndex(name: string): number;

    protected abstract getTabName(index: number): string;
}
