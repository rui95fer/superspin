<?php

use App\Http\Controllers\CoachController;
use Illuminate\Support\Facades\Route;

Route::get('/coaches', [CoachController::class, 'index']);

