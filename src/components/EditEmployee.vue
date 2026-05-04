<template>
  <div class="edit-employee-page" style="background-color: whitesmoke; min-height: 100vh; padding-bottom: 50px;">

    <div class="header d-flex carbon-mesh text-white px-5 align-items-center gap-5 justify-content-between pb-5 pt-4">
        <div class="title">
            <h1 style="font-weight: 900; font-size: 3.25rem; line-height: 1; letter-spacing: -0.025em;">
                Edit Employee <span class="text-primary">.</span>
            </h1>
            <p class="text-white-50 fs-5 mt-2">Update and manage personnel records with precision.</p>
        </div>
    </div>

    <div class="container" style="margin-top: -80px; position: relative; z-index: 10;">
        <div class="card border-0 shadow rounded-4 p-5 bg-white">
            <div class="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
                <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px;">
                    <span class="material-symbols-outlined fs-3">edit_document</span>
                </div>
                <div>
                    <h2 class="h4 mb-0 fw-bold">Employee Information</h2>
                    <small class="text-muted">Modify the details of this employee below.</small>
                </div>
            </div>

            <form @submit.prevent="updateData" class="form mt-4">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <label class="form-label fw-bold text-secondary">Employee ID</label>
                        <div class="input-group input-group-lg">
                            <span class="input-group-text bg-light border-end-0 rounded-start-3">
                                <span class="material-symbols-outlined text-muted">badge</span>
                            </span>
                            <input type="text" class="form-control bg-light border-start-0 ps-0 rounded-end-3" v-model="emp.id" readonly>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold text-secondary">Employee Name</label>
                        <div class="input-group input-group-lg">
                            <span class="input-group-text bg-white border-end-0 rounded-start-3">
                                <span class="material-symbols-outlined text-muted">person</span>
                            </span>
                            <input type="text" class="form-control border-start-0 ps-0 rounded-end-3" placeholder="e.g. John Doe" v-model="emp.name" required>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <label class="form-label fw-bold text-secondary">Designation</label>
                        <div class="input-group input-group-lg">
                            <span class="input-group-text bg-white border-end-0 rounded-start-3">
                                <span class="material-symbols-outlined text-muted">work</span>
                            </span>
                            <input type="text" class="form-control border-start-0 ps-0 rounded-end-3" placeholder="e.g. Senior Engineer" v-model="emp.designation" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold text-secondary">Department</label>
                        <div class="input-group input-group-lg">
                            <span class="input-group-text bg-white border-end-0 rounded-start-3">
                                <span class="material-symbols-outlined text-muted">corporate_fare</span>
                            </span>
                            <select class="form-select border-start-0 ps-0 rounded-end-3" v-model="emp.department" required>
                                <option value="" disabled>Select a department</option>
                                <option value="CEO">CEO</option>
                                <option value="CTO">CTO</option>
                                <option value="CIO/Chief Digital Officer/Chief Innovation Officer">CIO/Chief Digital Officer/Chief Innovation Officer</option>
                                <option value="VP of Product Management/Head of Product">VP of Product Management/Head of Product</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="VP of Marketing">VP of Marketing</option>
                                <option value="Chief Architect">Chief Architect</option>
                                <option value="Software Architect">Software Architect</option>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Software Developer">Software Developer</option>
                                <option value="Junior Software Developer">Junior Software Developer</option>
                                <option value="Intern Software Developer">Intern Software Developer</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-md-6">
                        <label class="form-label fw-bold text-secondary">Annual Salary ($)</label>
                        <div class="input-group input-group-lg">
                            <span class="input-group-text bg-white border-end-0 rounded-start-3">
                                <span class="material-symbols-outlined text-muted">payments</span>
                            </span>
                            <input type="number" class="form-control border-start-0 ps-0 rounded-end-3" placeholder="e.g. 120000" v-model="emp.salary" required>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-end align-items-center gap-3 pt-4 border-top">
                    <router-link to="/" class="btn btn-light btn-lg px-4 fw-semibold text-secondary rounded-3 border">Cancel</router-link>
                    <button type="submit" class="btn btn-primary btn-lg px-5 d-flex align-items-center gap-2 fw-semibold rounded-3 shadow-sm" :disabled="loading">
                        <span class="material-symbols-outlined" style="font-size: 20px;">save</span>
                        {{ loading ? 'Saving...' : 'Save Changes' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EditEmployeeComponent',
    data() {
        return {
            emp: {
                id: '',
                name: '',
                designation: '',
                department: '',
                salary: '',
            },
            loading: false
        }
    },
    mounted() {
        const id = this.$route.params.id;
        const stateEmp = window.history.state?.emp;
        
        if (stateEmp && stateEmp.id == id) {
            this.emp = { ...stateEmp };
        } else if (id) {
            this.fetchEmployee(id);
        } else {
            this.$router.push('/');
        }
    },
    methods: {
        fetchEmployee(id) {
            this.loading = true;
            axios.get(`https://69e7504668208c1debe8a880.mockapi.io/testApi/Employees/${id}`)
                .then(res => {
                    this.emp = res.data;
                })
                .catch(err => {
                    console.error("Failed to fetch employee:", err);
                    alert("Could not load employee details.");
                    this.$router.push('/');
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        updateData() {
            this.loading = true;
            axios.put(`https://69e7504668208c1debe8a880.mockapi.io/testApi/Employees/${this.emp.id}`, this.emp)
            .then(res => {
                console.log("Update Success", res.data);
                this.$router.push('/');
            })
            .catch(err => {
                console.error("Error Response:", err.response?.data);
                alert("Failed to update employee.");
            })
            .finally(() => {
                this.loading = false;
            });
        }   
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
    
    .form-control:focus, .form-select:focus {
        border-color: #dee2e6;
        box-shadow: none;
    }
    .input-group-text {
        border-right: none;
    }
    .input-group .form-control, .input-group .form-select {
        border-left: none;
    }
    .input-group:focus-within {
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        border-radius: 0.5rem;
    }
    .input-group:focus-within .input-group-text,
    .input-group:focus-within .form-control,
    .input-group:focus-within .form-select {
        border-color: #86b7fe;
    }
</style>