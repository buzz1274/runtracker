<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMaxTimeToPersonalBestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('personal_bests', function (Blueprint $table) {
            $table->unsignedSmallInteger('max_seconds')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('personal_bests', function (Blueprint $table) {
            $table->dropColumn('max_seconds');
        });
    }
}
