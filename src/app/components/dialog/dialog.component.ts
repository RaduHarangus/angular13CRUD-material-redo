import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {

  conditions = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;
  productList: any;

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {name: string}) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['']
    });
    this.getAllProducts();
  }

  addProduct() {
    this.api.addProduct(this.productForm.value)
      .subscribe({
        next: (res) => {
          alert('Product added successfully!');
          this.productForm.reset();
          this.dialogRef.close('save');
          this.getAllProducts();
        },
        error: (err) => {
          alert('There was a problem trying to add the product!' + err);
        }
      });
  }

  getAllProducts() {
    this.api.getAllProducts()
      .subscribe({
        next: (res) => {
          this.productList = res;
        },
        error: (err) => {
          alert('There was a problem fetching the product list!' + err);
        }
      });
  }

}
