# frozen_string_literal: true
module Api
  module V1
    class ContactListController < ApplicationController
      #base function to get all the records in the Contacts Table from the DB
      def index
        contacts = Contact.all
        render json: ContactSerializer.new(contacts).serialized_json
      end

      #function to get the information of a contact based on the id that is passed
      # returns a json with the information of the user or a 404 error if not found
      def show
        contact = Contact.where(id: params[:id])
        if contact[0] == nil
          render json: { error: "Not found" }, status: 404
        else
          render json: ContactSerializer.new(contact).serialized_json, status: 200
        end
      end

      #function to create a new record in the DB, creates the new record with the parsed data
      # If the email is already in the DB return a 403 error message
      # If the contact can't be saved due to DB error returns a 500
      def create
        contacts = Contact.all
        contact = Contact.new(contact_params)
        new_email = contact_params[:email]
        if contacts.find_by(email: new_email)
          render json: { error: "Email already in DB" }, status: 403
        else
          if contact.save
            render json: ContactSerializer.new(contact).serialized_json, status: 200
          else
            render json: { error: contact.errors.messages }, status: 500
          end
        end
      end

      #update a contact in the DB, first check if the record exists and if it does update the contact
      def update
        contact = Contact.find_by(email: params[:email])
        if contact[0] == nil
          render json: { error: "Not found" }, status: 404
        else
          if contact.update(contact_params)
            render json: ContactSerializer.new(contact).serialized_json, status: 200
          else
            render json: { error: contact.errors.messages }, status: 405
          end
        end

      end

      #delete a contact in the DB
      def destroy
        contact = Contact.find_by(id: params[:id])
        if contact == nil
          render json: { error: "Contact doesn't exist" }, status: 404
        else
          if contact.destroy
            head :no_content
          else
            render json: { error: contact.errors.messages }, status: 404
          end
        end
      end

      def contact_params
        params.permit(:first_name, :last_name, :phone_number, :email)
      end
    end
  end
end
