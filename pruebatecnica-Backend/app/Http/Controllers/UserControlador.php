<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserControlador extends Controller
{

    public static function createUser(array $data)
    {
        try {
            $user = new User();
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->password = Hash::make($data['password']);
            $user->save();

            return $user;
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 500);
        }



    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]);

            $user = User::createUser($validatedData);
            return response()->json(['message' => 'Usuario creado exitosamente', 'user' => $user], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 500);
        }
    }

    public function getAll(Request $request)
    {
        try {
            $user = User::all();

            return response()->json($user, 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 500);
        }


    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,'.$user->id,
            ]);

            $user->update([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
            ]);

            return response()->json(['message' => 'Usuario actualizado exitosamente', 'user' => $user], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 500);
        }


    }

    public function delete($id)
    {
        try {
            $user = User::findOrFail($id);

            $user->delete();

            return response()->json(['message' => 'Usuario eliminado exitosamente'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th], 500);
        }

    }
}
