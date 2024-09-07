import { CategoriesService } from './../../core/services/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly _CategoriesService = inject(CategoriesService)

  categoryList:ICategory[]=[];

  ngOnInit(): void {

      this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.categoryList=res.data
        }
      })
  }
}
