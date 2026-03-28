<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\AuthUserModel;
use App\Models\TeacherModel;

class UserController extends ResourceController
{
    // Get all users
    public function users()
    {
        $model = new AuthUserModel();
        $users = $model->findAll();

        return $this->respond($users);
    }

    // Get all teachers
    public function teachers()
    {
        $model = new TeacherModel();
        $teachers = $model->findAll();

        return $this->respond($teachers);
    }

}