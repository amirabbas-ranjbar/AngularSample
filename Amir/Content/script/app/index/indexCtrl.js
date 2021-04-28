app.controller('indexCtrl', function ($scope, $mdToast, $mdDialog, service, indexService) {
    var self = this;
    var myService = indexService;
    self.test = {
        id: 1,
        name: 'ali'
    };
    self.data = {
        id: 1,
        list: [
            {
                id: 1,
                name: 'ali',
                className: 'x1'

            },
            {
                id: 2,
                name: 'ali 2',
                className: 'x2'
            },
            {
                id: 3,
                name: 'ali 3',
                className: 'x3'
            }
        ]
    };


    myService.getAll().then(function (data) {
        self.data.list = data;
    });

    self.user = {
        Id: null,
        Name: null
    }

    self.handleAddUser = function () {
        var param = self.user;
        myService.persist(param).then(function (data) {
            self.data.list.push(data);
            service.showSuccess('انجام شد');
        });
    }



    self.handleShowEditPanel = function (item) {
        self.showEditPanelFlag = true;
        self.user.Id = item.Id;
        self.user.Name = item.Name;
    }

    self.handlePersistUser = function () {
        self.showEditPanelFlag = false
        var param = self.user;
        myService.persist(param).then(function (data) {
            self.data.list.push(data);
            service.showSuccess('انجام شد');
        });
    }


    self.handleDeleteUser = function (ev, x) {
        var confirm = $mdDialog.confirm()
            .title('حذف کاربر')
            .textContent('ایا از حذف کاربر ' + x.Name + ' مطمئنید؟')
            .ariaLabel('')
            .clickOutsideToClose(true)
            .targetEvent(ev)
            .cancel('انصــراف')
            .ok('حـــذف');
        $mdDialog.show(confirm).then(function () {
            var param = { Id: x.Id };
            myService.delete(param).then(function (data) {
               // self.data.list.push(data);
                //service.showSuccess('انجام شد');
            });
        });
    }
});