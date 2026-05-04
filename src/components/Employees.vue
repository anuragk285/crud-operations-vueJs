<template>
    <div style="background-color: whitesmoke; min-height: 100vh; padding-bottom: 50px;">
        <div class="header d-flex carbon-mesh text-white px-5 align-items-center gap-5 justify-content-between pb-5 pt-4">
            <div class="title mt-2">
                <h1 class="" style="font-weight: 900; font-size: 3.25rem; line-height: 1; letter-spacing: -0.025em;">Employees <span class="text-primary">.</span></h1>
                <p class="text-white-50 fs-5 mt-2">Empower your organization with precision data management and intelligent personnel tracking.</p>
            </div>
            <div class="add-emp mt-2">
                <router-link to="/addNewEmployee" class="btn btn-primary d-flex align-items-center gap-2 py-3 px-4 rounded-4 shadow-lg fw-bold transition-all hover-scale">
                    <span class="material-symbols-outlined fs-4">person_add</span>
                    ADD NEW EMPLOYEE
                </router-link>
            </div>
        </div>
        
        <div class="container" style="margin-top: -60px; position: relative; z-index: 10;">
            <div class="card border-0 shadow rounded-4 overflow-hidden bg-white mb-5">
                <div class="d-flex justify-content-between align-items-center p-4 border-bottom bg-white">
                    <div class="d-flex align-items-center gap-3">
                        <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex justify-content-center align-items-center" style="width: 40px; height: 40px;">
                            <span class="material-symbols-outlined fs-5">group</span>
                        </div>
                        <h2 class="h5 mb-0 fw-bold text-secondary">Employee Directory</h2>
                    </div>
                    <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fs-6 border border-primary border-opacity-10 shadow-sm">{{ list.length }} Members</span>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-borderless table-hover mb-0 align-middle">
                        <thead class="bg-light">
                            <tr>
                                <th class="text-uppercase text-muted fw-bold py-3 ps-4" style="letter-spacing: 0.5px; font-size: 0.75rem;">Employee</th>
                                <th class="text-uppercase text-muted fw-bold py-3" style="letter-spacing: 0.5px; font-size: 0.75rem;">Role & Dept</th>
                                <th class="text-uppercase text-muted fw-bold py-3" style="letter-spacing: 0.5px; font-size: 0.75rem;">Salary</th>
                                <th class="text-uppercase text-muted fw-bold py-3 pe-4 text-end" style="letter-spacing: 0.5px; font-size: 0.75rem;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="list.length === 0">
                                <td colspan="4" class="text-center py-5 text-muted">
                                    <div class="d-flex flex-column align-items-center">
                                        <span class="material-symbols-outlined fs-1 mb-2" style="color: #dee2e6;">group_off</span>
                                        <p class="mb-0">No employees found. Add one to get started.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="emp in list" :key="emp.id" class="border-bottom custom-hover-row">
                                <td class="py-3 ps-4">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="avatar bg-primary bg-gradient text-white d-flex justify-content-center align-items-center rounded-circle fw-bold shadow-sm" style="width: 45px; height: 45px; font-size: 1.2rem;">
                                            {{ emp.name ? emp.name.charAt(0).toUpperCase() : 'E' }}
                                        </div>
                                        <div>
                                            <h6 class="mb-0 fw-bold text-dark">{{ emp.name }}</h6>
                                            <small class="text-muted">ID: #{{ emp.id }}</small>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-3">
                                    <div class="d-flex flex-column align-items-start gap-1">
                                        <span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 px-2 py-1 rounded-2">{{ emp.designation }}</span>
                                        <small class="text-muted d-flex align-items-center gap-1">
                                            <span class="material-symbols-outlined" style="font-size: 14px;">corporate_fare</span>
                                            {{ emp.department }}
                                        </small>
                                    </div>
                                </td>
                                <td class="py-3">
                                    <div class="fw-semibold text-success d-flex align-items-center gap-1">
                                        <span class="material-symbols-outlined" style="font-size: 18px;">payments</span>
                                        ${{ Number(emp.salary).toLocaleString() }}
                                    </div>
                                </td>
                                <td class="py-3 pe-4 text-end">
                                    <div class="d-flex justify-content-end gap-2">
                                        <button @click.prevent="editEmployee(emp)" class="btn btn-sm btn-light text-primary d-flex align-items-center justify-content-center p-2 rounded-circle action-btn" title="Edit Employee">
                                            <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                                        </button>
                                        <button @click.prevent="confirmDelete(emp)" class="btn btn-sm btn-light text-danger d-flex align-items-center justify-content-center p-2 rounded-circle action-btn" title="Delete Employee">
                                            <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <DeletePopup 
            :show="showDeletePopup" 
            @cancel="cancelDelete" 
            @confirm="deleteEmployee" 
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import DeletePopup from './DeletePopup.vue';

    export default{
        name: 'EmployeesComponent',
        components: {
            DeletePopup
        },
        data(){
            return {
                list: [],
                showDeletePopup: false,
                employeeToDelete: null
            }
        },
        methods:{
            getData(){
                axios.get('https://69e7504668208c1debe8a880.mockapi.io/testApi/Employees')
                .then(res => {
                    this.list = res.data;
                    console.log('list updated')
                })
                .catch(err => {console.error(err)})
            },
            editEmployee(emp){
                this.$router.push({
                    name: 'EditEmployee',
                    params: { id: emp.id },
                    state: { emp }
                });
            },
            confirmDelete(emp) {
                this.employeeToDelete = emp;
                this.showDeletePopup = true;
            },
            cancelDelete() {
                this.showDeletePopup = false;
                this.employeeToDelete = null;
            },
            deleteEmployee() {
                if (this.employeeToDelete) {
                    axios.delete(`https://69e7504668208c1debe8a880.mockapi.io/testApi/Employees/${this.employeeToDelete.id}`)
                    .then(() => {
                        this.getData();
                        this.cancelDelete();
                    })
                    .catch(err => {
                        console.error(err);
                        this.cancelDelete();
                    });
                }
            }
        },  
        mounted(){
            this.getData();
        }
    }
</script>

<style scoped>
    .carbon-mesh {
        width: 100%;
        min-height: 280px; 
        background-color: #121d33;
        background-image: 
            linear-gradient(45deg, rgba(255,255,255,0.04) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.04) 75%),
            linear-gradient(45deg, rgba(255,255,255,0.04) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.04) 75%),
            radial-gradient(circle at center, transparent, rgba(0,0,0,0.4));
        background-size: 20px 20px, 20px 20px, 100% 100%;
        background-position: 0 0, 10px 10px, 0 0;
    }

    .hover-scale {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .hover-scale:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(13, 110, 253, 0.3) !important;
    }
    
    .custom-hover-row {
        transition: background-color 0.2s ease;
    }
    .custom-hover-row:hover {
        background-color: #f8f9fa;
    }
    
    .action-btn {
        width: 36px;
        height: 36px;
        transition: all 0.2s ease;
    }
    .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .action-btn.text-primary:hover {
        background-color: #0d6efd !important;
        color: white !important;
    }
    .action-btn.text-danger:hover {
        background-color: #dc3545 !important;
        color: white !important;
    }
    
    /* Smooth out table rendering */
    .table-responsive {
        border-radius: 0 0 1rem 1rem;
    }
</style>