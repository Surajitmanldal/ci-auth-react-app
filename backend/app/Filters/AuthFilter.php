<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

require_once APPPATH . 'Libraries/JWT/JWT.php';

use Firebase\JWT\JWT;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $header = $request->getHeaderLine("Authorization");

        if (!$header) {
            return \Config\Services::response()
                ->setJSON(['message' => 'Token required'])
                ->setStatusCode(401);
        }

        $token = str_replace('Bearer ', '', $header);

        try {
            $key = "SECRET_KEY";
            JWT::decode($token, $key, ['HS256']);
        } catch (\Exception $e) {
            return \Config\Services::response()
                ->setJSON(['message' => 'Invalid Token'])
                ->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}