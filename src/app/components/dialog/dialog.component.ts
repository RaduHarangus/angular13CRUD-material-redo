import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {

  conditions = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private api: ApiService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: [''],
      date: [''],
      condition: [''],
      price: [''],
      comment: ['']
    });
  }

  addProduct() {
    this.api.addProduct(this.productForm.value)
      .subscribe({
        next: (res) => {
          alert('Product added successfully!');
        },
        error: (err) => {
          alert('There was a problem trying to add the product!' + err);
        }
      });
  }

}
