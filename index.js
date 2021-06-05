Vue.use(VueToast);

const customer = new Vue({
    el: '#app',
    data: {
			customers : [],
			customer: {
				'name' : '',
				'email' : '',
				'password' : '',
				'gender' : '',
				'is_married' : '',
				'address' : '',
			},
			errors: {},
			showModal: true
    },
    mounted: function(){
			this.init();
    },
    methods: {
			init: function() {
				axios.get('http://thefthing-backend.local/customer').then(response => {
					this.customers = response.data.result.data
				})
			},
			deleteCustomer: function(id) {
				if(confirm("Do you really want to delete?")){

					const idx = this.customers.indexOf(id)

					axios.post('http://thefthing-backend.local/customer/'+id+'/delete').then(response => {

						this.customers.splice(idx, 1)

						Vue.$toast.success(response.data.status.message, {
								position: 'top-right'
						});
					})
				}
			},

			modalAddCustomer: function() {
					this.customer = [];
					this.$refs['modaAddCustomer'].show();
			},
			
			modalEditCustomer: function(id) {
				this.$refs['modalEditCustomer'].show();

				axios.get('http://thefthing-backend.local/customer/edit/'+id+'').then(response => {
					this.customer = response.data.result.data
				})
			},

			modalDetailCustomer: function(id) {
				this.$refs['modalDetailCustomer'].show();

				axios.get('http://thefthing-backend.local/customer/edit/'+id+'').then(response => {
					this.customer = response.data.result.data
				})
			},

			onCreate: function() {
				const self = this;

				let data = new FormData();

				data.append('name', this.customer['name'])
				data.append('email', this.customer['email'])
				data.append('password', this.customer['password'])
				data.append('gender', this.customer['gender'])
				data.append('is_married', this.customer['is_married'])
				data.append('address', this.customer['address'])

				axios.post('http://thefthing-backend.local/customer/store', data).then(function(response){
					Vue.$toast.success(response.data.status.message, {
							position: 'top-right'
					});

					self.init();
					self.$bvModal.hide('modaAddCustomer')
					
				}).catch(function(errors) {
					self.errors = errors.response.data.result;
				})
			},

			onUpdate: function(id) {

				const self = this;

				let data = new FormData();

				data.append('name', this.customer['name'])
				data.append('email', this.customer['email'])
				data.append('password', this.customer['password'] == undefined ? '' : this.customer['password'])
				data.append('gender', this.customer['gender'] == null ? '' : this.customer['gender'])
				data.append('is_married', this.customer['is_married'] == null ? '' : this.customer['is_married'])
				data.append('address', this.customer['address'])

				axios.post('http://thefthing-backend.local/customer/'+id+'/update', data).then(function(response){
					Vue.$toast.success(response.data.status.message, {
							position: 'top-right'
					});

					self.init();
					self.$bvModal.hide('modalEditCustomer')

				}).catch(function(errors) {
					self.errors = errors.response.data.result;
				})
			},
    }
})