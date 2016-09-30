<?php

namespace App\Http\Controllers;

use App\Run;
use Illuminate\Http\Request as Request;

class RunsController extends Controller {

    public function index(Request $request) {
        return response()->json(Run::where('who', 'david')->get());
    }

}