<?php
namespace App\Controllers;
require_once APPPATH . './Libraries/JWT/JWT.php';
require_once APPPATH . './Libraries/JWT/JWK.php';
require_once APPPATH . './Libraries/JWT/ExpiredException.php';
require_once APPPATH . './Libraries/JWT/SignatureInvalidException.php';
require_once APPPATH . './Libraries/JWT/BeforeValidException.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

use CodeIgniter\RESTful\ResourceController;
use App\Models\AuthUserModel;
use App\Models\TeacherModel;

class AuthController extends ResourceController
{
    public function register()
    {
        $data = $this->request->getJSON();

        $authModel = new AuthUserModel();
        $teacherModel = new TeacherModel();

        // Hash password
        $passwordHash = password_hash($data->password, PASSWORD_DEFAULT);

        // Insert user
        $userId = $authModel->insert([
            'email' => $data->email,
            'first_name' => $data->first_name,
            'last_name' => $data->last_name,
            'password' => $passwordHash,
        ]);

        // Insert teacher
        $teacherModel->insert([
            'user_id' => $userId,
            'university_name' => $data->university_name,
            'gender' => $data->gender,
            'year_joined' => $data->year_joined,
        ]);

        return $this->respond(['status' => 'success', 'message' => 'User registered successfully'], 201);
    }
    public function login()
{
    $data = $this->request->getJSON();

    $authModel = new AuthUserModel();
    $user = $authModel->where('email', $data->email)->first();

    if (!$user) {
        return $this->respond(['message' => 'User not found'], 404);
    }

    if (!password_verify($data->password, $user['password'])) {
        return $this->respond(['message' => 'Invalid password'], 401);
    }

    $key = "SECRET_KEY";

    $payload = [
        'iat' => time(),
        'exp' => time() + 3600,
        'data' => [
            'id' => $user['id'],
            'email' => $user['email']
        ]
    ];

    $token = JWT::encode($payload, $key, 'HS256');

    return $this->respond([
        'message' => 'Login successful',
        'token' => $token
    ]);
}
public function profile()
{
    return $this->respond([
        'message' => 'Authenticated successfully. Access granted to protected APIs.'
    ]);
}
}