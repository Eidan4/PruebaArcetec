<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserControlador;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users', [UserControlador::class, 'store']);
Route::get('/users', [UserControlador::class, 'getAll']);
Route::put('/users/{id}', [UserControlador::class, 'update']);
Route::delete('/users/{id}', [UserControlador::class, 'delete']);

