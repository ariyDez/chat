<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Message;
use App\Events\MessagePosted;
use Hash;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('logout');
    }

    public function getMessages(Request $request)
    {
        $messages = Message::with('user')->get();

        return response()
            ->json([
                'user' => Auth::user(),
                'messages' => $messages
            ]);
    }

    public function postMessage(Request $request)
    {
        $user = Auth::user();
        if(Auth::id() != $request->user['id']) {
            return response()
                ->json([
                    'error' => 'You do not have access to post message'
                ], 411);
        }

        $this->validate($request, [
            'message' => 'required'
        ]);

        $message = $user->messages()->create([
            'message' => $request->message
        ]);

        broadcast(new MessagePosted($message, $user))->toOthers();

        return response()
            ->json([
                'posted' => true
            ]);
    }
}
