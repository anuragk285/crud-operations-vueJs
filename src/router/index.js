import { createRouter, createWebHistory } from 'vue-router'
import EmployeeForm from '@/components/EmployeeForm.vue'
import EmployeesComponent from '@/components/Employees.vue'
import EditEmployee from '@/components/EditEmployee.vue'

const routes = [
    { path: '/', component: EmployeesComponent },
    { path: '/addNewEmployee', component: EmployeeForm },
    { path: '/editEmployee/:id', name: 'EditEmployee', component: EditEmployee}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;