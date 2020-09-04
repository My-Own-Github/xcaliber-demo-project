import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CartItemService } from 'src/app/service/cart-item.service';
/**
 *
 *
 * @export
 * @class ItemsListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  /**
   *
   *
   * @type {*}
   * @memberof ItemsListComponent
   */
  categoryData: any;
  actulItemPrice: number;
  catgItemsList: Array<any>;
  counter: number = 1;
  amount: number = 0;
  // cartItems: Array<any>;
  errorMsg: string;
  isError: boolean = false;
  cartItems: any;
  /**
   *Creates an instance of ItemsListComponent.
   * @param {Location} _location
   * @param {Router} router
   * @memberof ItemsListComponent
   */
  constructor(private _location: Location, private router: Router, private cartItemService: CartItemService) { }
  /**
   *
   *
   * @memberof ItemsListComponent
   */
  ngOnInit() {
    this.categoryData = history.state.data;
    if (this.categoryData.items) {
      this.catgItemsList = this.categoryData.items;
    }
  }
  /**
   *
   *
   * @param {*} item
   * @memberof ItemsListComponent
   */
  addItem(item: any) {
    let index: any = this.catgItemsList.indexOf(item);
    this.counter = this.catgItemsList[index].qty
    this.catgItemsList[index].qty = this.counter + 1;
    this.catgItemsList[index].amount = parseInt(this.catgItemsList[index].price) * (this.counter + 1);
    this.cartItemService.setCartItems(item)
  }
  /**
   *
   *
   * @param {*} item
   * @memberof ItemsListComponent
   */
  removedItem(item: any) {
    let index: any = this.catgItemsList.indexOf(item);
    this.counter = this.catgItemsList[index].qty
    if (this.counter > 0) {
      this.catgItemsList[index].qty = this.counter - 1;
      this.catgItemsList[index].amount = parseInt(this.catgItemsList[index].price) * (this.counter - 1);
      this.cartItemService.setCartItems(item)
    } else {
      let indx: any = this.cartItems.indexOf(item);
      this.cartItems.splice(indx, 1)
      return
    }
  }

  /**
   *
   *
   * @memberof ItemsListComponent
   */
  processToCartItem() {
    let cartItems:Array<any> = this.cartItemService.getCartItems()
    if (cartItems.length > 0) {
      this.router.navigate(['/homePage'], { state: { "data": this.cartItems } })
    } else {
      this.isError = true;
      setTimeout(() => this.isError = false, 2000);
    }
  }

  /**
   *
   *
   * @memberof ItemsListComponent
   */
  goBack() {
    this.cartItems = [];
    this._location.back();
  }

}
