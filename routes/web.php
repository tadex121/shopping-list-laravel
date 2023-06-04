<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Auth::routes();

Route::get('/home', [App\Http\Controllers\ListsController::class, 'index'])->name('home');

Route::post('/add-list', [App\Http\Controllers\ListsController::class, 'create']);

Route::get('/lists', [App\Http\Controllers\ListsController::class, 'index']);

Route::put('/lists/{id}', [App\Http\Controllers\ListsController::class, 'update']);

Route::delete('/lists/{id}', [App\Http\Controllers\ListsController::class, 'delete']);

