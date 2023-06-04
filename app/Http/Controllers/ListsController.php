<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lists;

class ListsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $lists = Lists::where('status', 'active')->get();

    if ($request->expectsJson()) {
        return response()->json($lists);
    } else {
        return view('home', compact('lists'));
    }

    }
    public function create(Request $request)
    {
        $payload = $request->all();
 
        
        $list = Lists::create($payload);
    
    }
       public function update(Request $request, $id)
    {
        $list = Lists::findOrFail($id);

        $list->update($request->all());

        return response()->json(['message' => 'List updated successfully']);
    }
    public function delete(Request $request, $id)
    {
        $list = Lists::findOrFail($id);
        $list->status = 'deleted';
        $list->save();

        return response()->json(['message' => 'List deleted successfully']);
    }
}

