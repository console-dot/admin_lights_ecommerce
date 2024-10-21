import React, { useContext } from 'react'
import { Layout } from '../themes'
import { Category, CreateProduct, DashBoard, EditProduct, List, Order, Testimonials } from '../components'
import AddContext from '../context/dashboard/AddContext';
import { AddTestimonials } from '../components/pagesComponent/AddTestmonials';
import { HomePage } from './HomePage';


export const AdminDashboard = () => {
  const selectComponent = useContext(AddContext);
  return (
    <Layout>
      {selectComponent.selectedComponent === "Product list" && <List />}
      {selectComponent.selectedComponent === "dashboard" && <DashBoard />}
      {selectComponent.selectedComponent === "create Product" && <CreateProduct />}
      {selectComponent.selectedComponent === "order list" && <Order />}
      {selectComponent.selectedComponent === "edit Product" && <EditProduct />}
      {selectComponent.selectedComponent === "Add Testimonials" && <AddTestimonials />}
      {selectComponent.selectedComponent === "testimonials" && <Testimonials />}
      {selectComponent.selectedComponent === "category" && <Category />}
      {selectComponent.selectedComponent === "Landing Page" && <HomePage />}
    </Layout>
  )
} 
