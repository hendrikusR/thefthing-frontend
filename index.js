Vue.use(VueToast);

const customer = new Vue({
    el: '#app',
    data: {
			'add': {},
			'edit': [],
			'customers' : [],
    },
    mounted: function(){
			axios.get('http://localhost:5000/customer').then(response => {
				this.customers = response.data.result.data
			})
    },
    methods: {
			deleteCustomer: function(id) {
				if(confirm("Do you really want to delete?")){

					const idx = this.customers.indexOf(id)

					axios.post('http://localhost:5000/customer/'+id+'/delete').then(response => {

						this.customers.splice(idx, 1)

						Vue.$toast.success(response.data.status.message, {
								position: 'top-right'
						});
					})
				}
			},

			modalAddCustomer: function() {
					this.$refs['modaAddCustomer'].show();
			},
			
			modalEditCustomer: function(id) {
				this.$refs['modalEditCustomer'].show();

				axios.get('http://localhost:5000/customer/edit/'+id+'').then(response => {
						this.edit = response.data.result.data
				})
			},

			onCreate: function() {

			},

			onUpdate: function() {
				console.log(this.edit['name']);
			}
    }
})