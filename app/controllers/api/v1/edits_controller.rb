module Api
  module V1
    class EditsController < ApplicationController
      #base function to get all the records in the Edits Table from the DB
      def index
        edits = Edit.all
        render json: EditSerializer.new(edits).serialized_json, status: 200
      end

      #function to get the information of an edit based on the contact_id that is passed
      # returns a json with the information of the edits or a 404 error if not found
      def show
        edit = Edit.where(contact_id: params[:id])
        if edit == []
          render json: { error: "There's no edit data for this contact" }, status: 202
        else
          render json: EditSerializer.new(edit).serialized_json, status: 200
        end
      end

      #function to create a new record in the DB, creates the new record with the parsed data
      # If the contact can't be saved due to DB error returns a 500
      def create
        edit = Edit.new(edit_params)
        if edit.save
          render json: EditSerializer.new(edit).serialized_json, status: 200
        else
          render json: { error: edit.errors.messages }, status: 500
        end
      end

      #destroys a record in the DB
      def destroy
        edit = Edit.where(contact_id: params[:id])
        if edit.destroy_all
          head :no_content
        else
          render json: {error: edit.errors.messages }, status: 404
        end
      end

      def edit_params
        params.permit(:date, :previous_first_name, :previous_last_name, :previous_phone_number,
                      :previous_email, :history, :contact_id)
      end
    end
  end
end
