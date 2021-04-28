app.factory('indexService', function (service) {

    return {
        getAll: getAll,
        persist: persist,
        delete:deleteUser,
    }
    function getAll() {
        return service.get("/Home/GetAll");
    }

    function persist(data) {
        return service.post("/Home/Persist", data);
    }
    function deleteUser(data) {
        return service.post("/Home/Delete", data);
    }
});