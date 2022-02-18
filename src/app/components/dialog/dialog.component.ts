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
  actionBtn = 'Save';

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['']
    });

    if (this.editData) {
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['condition'].setValue(this.editData.condition);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.actionBtn = 'Update';
    } else {
      this.actionBtn = 'Save';
    }

    this.getAllProducts();
  }

  addProduct() {
    if (this.editData) {
        this.api.putProduct(this.editData.id, this.productForm.value)
          .subscribe({
            next: (res) => {
              alert('Product updated successfully!');
              this.productForm.reset();
              this.dialogRef.close('update');
              this.getAllProducts();
            },
            error: (err) => {
              alert('There was a problem trying to update the product!' + err);
            }
          });
    } else {
      if(this.productForm.valid){
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
    }

  }

  // updateProduct() {
  //   if(this.productForm.valid){
  //     this.api.updateProduct(this.productForm.id, this.productForm.value)
  //       .subscribe({
  //         next: (res) => {
  //           alert('Product added successfully!');
  //           this.productForm.reset();
  //           this.dialogRef.close('save');
  //           this.getAllProducts();
  //         },
  //         error: (err) => {
  //           alert('There was a problem trying to add the product!' + err);
  //         }
  //       });
  //   }
  // }

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
