# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

Se utiliza el componente llamado `owner-list` para mostrar la lista de owners. Esta vista se accede por la ruta `http://localhost:4200/owner-list`

Se utiliza el servicio `OwnerService` para consumir el API de owners y realizar operaciones sobre esta mediante los métodos del protocolo HTTP.

Se utiliza el componente llamado `owner-edit` para agregar y editar owners. 
A través de la ruta `http://localhost:4200/owner-add` se accede a la página para agregar un nuevo owner; también se accede mediante el botón add en la página de lista de owners.
A través de la ruta `http://localhost:4200/owner-edit/{dni}` se accede a la vista para modificar o eliminar owners; esta vista es accedida facilmente pulsando sobre el nombre del owner que se quiere modificar/borrar en la lista de owners.

Se utiliza el componente llamado `car-owner` para mostrar la lista de los carros con sus propietarios. Esta vista se accede a través de la ruta `http://localhost:4200/car-owner`

Se utiliza el servicio `UtilityService` para exponer un método que permite validar la relación owner-carro antes de eliminar un owner. En caso de que un owner este asociado a varios carros, se elimina la unión actualizando el ownerDni = null en los respectivos carros.


